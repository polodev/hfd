#!/bin/sh
set -eu
# Use Bundler when the project's gems have been installed. On this older Mac,
# the maintained Ruby is installed by Homebrew rather than /usr/bin/ruby.
for candidate in /opt/homebrew/opt/ruby/bin /usr/local/opt/ruby/bin; do
  if [ -x "$candidate/ruby" ]; then
    PATH="$candidate:$PATH"
    export PATH
    break
  fi
done
if command -v bundle >/dev/null 2>&1 && bundle check >/dev/null 2>&1; then
  exec bundle exec jekyll "$@"
fi
# Also find user-installed gems without hard-coding a Ruby version or username.
GEM_USER_BIN="$(ruby -rrubygems -e 'print Gem.user_dir')/bin"
if [ -x "$GEM_USER_BIN/jekyll" ]; then
  exec ruby "$GEM_USER_BIN/jekyll" "$@"
fi
exec jekyll "$@"
