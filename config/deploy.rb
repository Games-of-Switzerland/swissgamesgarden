# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'gos'
set :repo_url, 'git@github.com:Games-of-Switzerland/gos-website.git'

set :docker_app_name, -> {
  [fetch(:application), fetch(:stage)].join('_')
}
set :docker_app_service, 'next_app'
set :docker_containers, 'next_app'

server 'gos.museebolo.ch', port: '44144', user: 'deploy', roles: %w{app db web}

# Link environments files
set :linked_files, fetch(:linked_files, []).push("docker-compose.override.yml")

# Copy environments files. Some files can't be symlink because they are use with relative path (for example ../../.env)
# which results to broken file path on symlinks.
set :copied_files, fetch(:copied_files, []).push(".env")

# Default value for :scm is :git
set :scm, :git

# Default value for :pty is false
# set :pty, true

# Default value for :format is :pretty
# set :format, :pretty

# Default value for keep_releases is 5
# set :keep_releases, 3

# Set SSH options
set :ssh_options, {
  forward_agent: true
}

namespace :deploy do
  desc 'Copy files from shared to release path'
  task :copy_files do
    on roles(:app) do
      within current_path do
        fetch(:copied_files).each do |file|
          target = release_path.join(file)
          source = shared_path.join(file)
          next if test "[ -L #{target} ]"
          execute :rm, target if test "[ -f #{target} ]"
          execute :cp, source, target
        end
      end
    end
  end

  desc '(re)Start docker containers'
  task :restart do
    on roles(:app) do
      within current_path do
        # Build then start service
        execute :docker_compose, 'up', '-d', '--no-deps', '--build', fetch(:docker_containers)
      end
    end
  end

  desc 'Stop all docker containers'
  task :stop do
    on roles(:app) do
      within current_path do
        execute :docker_compose, 'down'
      end
    end
  end

  desc 'Cleanup docker storage (container, imaged, ...)'
  task :cleanup do
    on roles(:app) do
      within current_path do
        execute :docker, 'system', 'prune', '-f', raise_on_non_zero_exit: false
      end
    end
  end

  namespace :permissions do
    desc 'Set cleanup permissions to allow deletion of releases'
    task :cleanup do
      on roles(:app) do
        releases = capture(:ls, '-x', releases_path).split
        valid, invalid = releases.partition { |e| /^\d{14}$/ =~ e }

        if valid.count >= fetch(:keep_releases)
          directories = (valid - valid.last(fetch(:keep_releases))).map do |release|
            releases_path.join(release)
          end
          if test("[ -d #{current_path} ]")
            current_release = capture(:readlink, current_path).to_s
            if directories.include?(current_release)
              directories.delete(current_release)
            end
          end
          if directories.any?
            directories.each_slice(100) do |directories_batch|
              execute :chmod, '-R' ,'ug+w', *directories_batch
            end
          end
        end
      end
    end
  end

  before 'deploy:symlink:shared', 'deploy:copy_files'

  after :publishing, 'deploy:restart'

  # Cleanup old release.
  before :cleanup, "deploy:permissions:cleanup"
end
