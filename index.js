#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const untildify = require('untildify')

const cheerio = require('cheerio')

const baseExtensionPath = untildify('~/.config/google-chrome/Default/Extensions/hkhggnncdpfibdhinjiegagmopldibha')

const fullExtensionPath = fs.readdirSync(baseExtensionPath)[0]

const extensionFileToAlter = path.join(baseExtensionPath, fullExtensionPath, 'reminders.html')

const $ = cheerio.load(fs.readFileSync(extensionFileToAlter, 'utf8'))
// @ts-expect-error
if ($('#custom-style-foo').length > 0) return

$('head').append(`
		<style id="custom-style-foo">
		.layout.center-justified, .layout.center-center{
			margin: 0.6rem;
		}
		.title {
			display:flex !important;
			overflow-y: initial !important;
			max-height: initial !important;
		}
		.event{
			height:auto !important;
		}
		#events{
			height: 100% !important;
		}
		</style>
`)

fs.writeFileSync(extensionFileToAlter, $.html(), 'utf8')
