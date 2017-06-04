declare interface KV {
  [name: string]: any
}

declare module '*.less' {
  var o: any;
  export = o;
}

declare interface ComponentJSON {
  organization: string,
  name: string,
  docs: {
    [name: string]: string
  }
}

declare interface ComponentMap {
  [fullname: string]: {
    readme?: string,
    json: ComponentJSON,
    docs?: {
      [name: string]: string
    },
    path: string
  }
}

declare interface System {
  import(request: string): Promise<any>
}
declare var System: System
