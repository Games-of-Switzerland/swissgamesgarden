# www.swissgames.garden
set :deploy_to, '/srv/www.swissgames.garden'
server 'prdsgg.unil.ch', port: '44144', user: 'deploy', roles: %w{app db web}

# set a branch for this release
set :branch, 'master'

# Map docker and docker compose commands
# NOTE: If stage have different deploy_to
# you have to copy those line for each <stage_name>.rb
# See https://github.com/capistrano/composer/issues/22
SSHKit.config.command_map[:docker_compose] = "docker compose -p #{fetch(:docker_app_name)}"
SSHKit.config.command_map[:docker] = 'docker'
