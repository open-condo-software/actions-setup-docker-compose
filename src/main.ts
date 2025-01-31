import { exec } from '@actions/exec'
import { cacheFile, downloadTool } from '@actions/tool-cache'

export async function runCommand(command: string): Promise<string> {
  let result = ''

  const execResult = await exec(command, [], {
    listeners: {
      stdout: (data: Buffer) => {
        result += data.toString()
      }
    }
  })

  if (execResult !== 0) {
    throw new Error(`Failed to exec command ${command}`)
  }
  return result.trim()
}

async function install(version: string): Promise<string> {
  const system = await runCommand('uname -s')
  const hardware = await runCommand('uname -m')
  const link = `https://github.com/docker/compose/releases/download/${version}/docker-compose-${system}-${hardware}`

  const packageInstallerPath = await downloadTool(link)
  await exec(`chmod +x ${packageInstallerPath}`)

  const cachePath = await cacheFile(
    packageInstallerPath,
    'docker-compose',
    'docker-compose',
    'latest'
  )
  return cachePath
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(version: string): Promise<string> {
  switch (process.platform) {
    case 'linux':
      return install(version)
    default:
      throw new Error(`Unsupported platform ${process.platform}`)
  }
}
