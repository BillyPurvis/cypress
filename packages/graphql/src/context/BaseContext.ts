import type { LaunchArgs } from '@packages/server/lib/open_project'
import type { OpenProjectLaunchOptions } from '@packages/server/lib/project-base'
import type { BaseActions } from '../actions/BaseActions'
import { App, Wizard, NavigationMenu, Project, Viewer } from '../entities'

/**
 * The "Base Context" is the class type that we will use to encapsulate the server state.
 * It will be implemented by ServerContext (real state) and TestContext (client state).
 *
 * This allows us to re-use the entire GraphQL server definition client side for testing,
 * without the need to endlessly mock things.
 */
export abstract class BaseContext {
  abstract readonly actions: BaseActions
  abstract localProjects: Project[]
  abstract viewer: null | Viewer

  constructor (private _launchArgs: LaunchArgs, private _launchOptions: OpenProjectLaunchOptions) {}

  wizard = new Wizard()
  navigationMenu = new NavigationMenu()
  app = new App(this)

  get activeProject () {
    return this.app.activeProject
  }

  get launchArgs () {
    return this._launchArgs
  }

  get launchOptions () {
    return this._launchOptions
  }

  isFirstOpen = false
}
