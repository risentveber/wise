#!/usr/bin/env bash
node index.js
rsync build/ rs:/var/www/wise --delete -r