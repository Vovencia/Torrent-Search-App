import { ResolveFromRoot } from "../utils/ResolveFromRoot";
import {IfWin} from "../utils/IsWin";

const { spawn } = require('child_process');

const cordova = ResolveFromRoot('node_modules', '.bin', 'cordova');

const ls = spawn(`${ cordova }${ IfWin('.cmd', '') }`, ['build'], {
	encoding: 'utf-8',
	cwd: ResolveFromRoot(),
	env: {
		JAVA_HOME: ResolveFromRoot('libs', 'openjdk-11.0.2_windows-x64_bin', 'jdk-11.0.2'),
		ANDROID_HOME: process.env['ANDROID_HOME'],
		ANDROID_SDK_ROOT: process.env['ANDROID_SDK_ROOT'],
	},
});

ls.stdout.on('data', (data: Buffer) => {
	console.log(data.toString('utf-8'));
});

ls.stderr.on('data', (data: Buffer) => {
	console.error(data.toString('utf-8'));
});

ls.on('close', (code: string) => {
	console.log(`Exited with code: ${ code }`);
});
