# staging-www.gos.ch
set :deploy_to, '/srv/staging-www.gos.ch'

# set a branch for this release
set :branch, 'dev'

# Add robots no-follow to staging.
append :linked_files, "public/robots.txt"

# Map docker and docker-compose commands
# NOTE: If stage have different deploy_to
# you have to copy those line for each <stage_name>.rb
# See https://github.com/capistrano/composer/issues/22
SSHKit.config.command_map[:docker_compose] = "docker-compose -p #{fetch(:docker_app_name)}"
SSHKit.config.command_map[:docker] = 'docker'
