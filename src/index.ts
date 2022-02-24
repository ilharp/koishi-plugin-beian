import { Context, Schema } from 'koishi'
import { DataService } from '@koishijs/plugin-console'
import { resolve } from 'path'

declare module '@koishijs/plugin-console' {
  namespace Console {
    interface Services {
      beian: BeianProvider
    }
  }
}

export const name = 'beian'

export interface Config {
  links?: {
    name?: string
    href?: string
  }[]
}

export default class BeianProvider extends DataService<Config> {
  static using = ['console'] as const
  static schema: Schema<Config> = Schema.object({
    links: Schema.array(
      Schema.object({
        name: Schema.string().description('链接名称。').required(),
        href: Schema.string().description('链接目标。'),
      })
    ).description('要显示的链接。'),
  })

  private config: Config

  constructor(ctx: Context, config: Config) {
    super(ctx, 'beian')

    this.config = config

    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
  }

  async get(forced = false) {
    return this.config
  }
}
