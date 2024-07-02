import * as core from '@actions/core'
import { run } from './main'

async function bootstrap(): Promise<void> {
  try {
    const version: string = core.getInput('version', {trimWhitespace: true})

    const path = await run(version)
    core.info(`created path for executable ${path}`)
    core.addPath(path)
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : 'Unknown error')
  }
}

bootstrap()
