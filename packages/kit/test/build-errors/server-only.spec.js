import { assert, test } from 'vitest';
import { execSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';

const timeout = 60_000;

test('$lib/*.server.* is not statically importable from the client', { timeout }, () => {
	try {
		execSync('pnpm build', {
			cwd: path.join(process.cwd(), 'apps/server-only-module'),
			stdio: 'pipe',
			timeout
		});
	} catch (err) {
		const message = /** @type {Error} */ (err).message;
		assert.ok(
			message.includes('Cannot import $lib/test.server.js into client-side code'),
			`received unexpected exception message ${message}`
		);
		return;
	}
	throw new Error();
});

test('$lib/*.server.* is not dynamically importable from the client', { timeout }, () => {
	try {
		execSync('pnpm build', {
			cwd: path.join(process.cwd(), 'apps/server-only-module-dynamic-import'),
			stdio: 'pipe',
			timeout
		});
	} catch (err) {
		const message = /** @type {Error} */ (err).message;
		assert.ok(
			message.includes('Cannot import $lib/test.server.js into client-side code'),
			`received unexpected exception message ${message}`
		);
		return;
	}
	throw new Error();
});

test('$lib/server/* is not statically importable from the client', { timeout }, () => {
	try {
		execSync('pnpm build', {
			cwd: path.join(process.cwd(), 'apps/server-only-folder'),
			stdio: 'pipe',
			timeout
		});
	} catch (err) {
		const message = /** @type {Error} */ (err).message;
		assert.ok(
			message.includes('Cannot import $lib/server/something/private.js into client-side code'),
			`received unexpected exception message ${message}`
		);
		return;
	}
	throw new Error();
});

test('$lib/server/* is not dynamically importable from the client', { timeout }, () => {
	try {
		execSync('pnpm build', {
			cwd: path.join(process.cwd(), 'apps/server-only-folder-dynamic-import'),
			stdio: 'pipe',
			timeout
		});
	} catch (err) {
		const message = /** @type {Error} */ (err).message;
		assert.ok(
			message.includes('Cannot import $lib/server/something/private.js into client-side code'),
			`received unexpected exception message ${message}`
		);
		return;
	}
	throw new Error();
});
