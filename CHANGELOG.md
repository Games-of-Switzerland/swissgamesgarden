# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- add gems ed25519 bcrypt_pbkdf
- add missing cantons (zug, jura, uri, schwyz, obwald, nidwald & glarus) translations - #149
- add missing status 'Prototype' translation - #149
- add missing platforms (acorn_archimedes, AppleIIGS, CDC1604 & playdate) translations - #149

### Changed
- improve display of studioes & members on Game detail page - #140

### Fixed
- fix placeholder image still visible when images are loaded from Browser cache
- fix visual glitch of games genres not wrapping - #150

## [1.0.0] - 2024-02-23
### Changed
- fix usage of hits.total on Elasticsearch with ES8 upgrade

### Fixed
- fix filters dropdown missing translations string

## [0.1.5] - 2023-06-06
### Security
- update all dependencies JavaScript

### Removed
- remove image aspect --ratio - Games-of-Switzerland/swissgamesgarden#130

## [0.1.4] - 2023-04-05
### Changed
- update job of Robin François - Games-of-Switzerland/swissgamesgarden#122

### Added
- add missing translations strings - Games-of-Switzerland/swissgamesgarden#126

### Fixed
- fix slow communication (timeout) between NextJS -> Backend - update the hosts strategy to be compliante with new Docker container naming architecture

## [0.1.3] - 2022-10-07
### Added
- add Robin François on the consultants section - Games-of-Switzerland/swissgamesgarden#9

## [0.1.2] - 2022-09-11
### Security
- update library react-query 3.34.14 => 3.39.2

### Fixed
- fix the pager - Games-of-Switzerland/swissgamesgarden#82

## [0.1.1] - 2022-09-10
### Changed
- rework the deployment using Github environements
- remove \[ & ] from the mailto subject of game udpate btn - Games-of-Switzerland/swissgamesgarden#88

### Added
- add no-index robots.txt on staging only - #102
- add missing Stores links on Games detail - Games-of-Switzerland/swissgamesgarden#46
- allow link to be button - Games-of-Switzerland/swissgamesgarden#9
- add Cantons filters - Games-of-Switzerland/swissgamesgarden#51
- add filter cantons - Games-of-Switzerland/swissgamesgarden#51
- add cantons listing on game detail - Games-of-Switzerland/swissgamesgarden#51

### Fixed
- add & fix missing translations strings for filters
- fix footnote link visual glitch - Games-of-Switzerland/swissgamesgarden#9
- fix about page links people - Games-of-Switzerland/swissgamesgarden#9
- fix empty state games - Games-of-Switzerland/swissgamesgarden#28
- fix the members of games visual - Games-of-Switzerland/swissgamesgarden#98

## [0.1.0] - 2022-09-08
### Changed
- update the hosts strategy to be compliante with new Docker container naming architecture

### Added
- update changelog following 'keep a changelog'

[Unreleased]: https://github.com/Games-of-Switzerland/swissgamesgarden/compare/1.0.0...HEAD
[1.0.0]: https://github.com/Games-of-Switzerland/swissgamesgarden/compare/0.1.5...1.0.0
[0.1.5]: https://github.com/Games-of-Switzerland/gos-website/compare/0.1.4...0.1.5
[0.1.4]: https://github.com/Games-of-Switzerland/gos-website/compare/0.1.3...0.1.4
[0.1.3]: https://github.com/Games-of-Switzerland/gos-website/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/Games-of-Switzerland/gos-website/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/Games-of-Switzerland/gos-website/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/Games-of-Switzerland/gos-website/releases/tag/0.1.0
