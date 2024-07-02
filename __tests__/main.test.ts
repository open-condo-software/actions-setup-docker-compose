import { runCommand, run } from '../src/main'
import * as core from '@actions/core'

import { describe, expect, it, test } from '@jest/globals'

describe('runCommand', () => {
  it('run a command and return stdout result', async () => {
    const result = await runCommand('echo test result')
    expect(result).toBe('test result')
  })
})

describe('run', () => {
  it('can install latest version', async () => {
    const commandPath = await run('v2.27.1')
    core.addPath(commandPath)

    const result = await runCommand('docker compose version')
    expect(result).not.toBeFalsy()
  })
})
