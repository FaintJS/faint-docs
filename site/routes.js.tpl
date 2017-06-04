import React from 'react'
import MarkDown from './components/MarkDown'
import Example from './components/Example'

let readme
let Comp
let raw
export default [
  <% for (var fullname in stats.components) { %>
  <% var component = stats.components[fullname] %>
  {
    path: '{{component.path}}',
    getComponent (state, cb) {
      require.ensure([], (require) => {
        let children = []
        {{if component.readme }}
        readme = require(`!raw-loader!{{component.readme.replace(/\\/g, '\\\\')}}`)
        children.push(<MarkDown source={readme} key='{{fullname}}'/>)
        {{/if}}

        {{if component.docs}}
        <% for (var name in component.docs) { %>
        <% var doc = component.docs[name] %>
        raw = require(`!raw-loader!{{doc.replace(/\\/g, '\\\\')}}`)
        readme = require(`!raw-loader!{{doc.replace(/\\/g, '\\\\')}}/readme.md`)
        Comp = require(`{{doc.replace(/\\/g, '\\\\')}}`).default
        children.push(
          <Example title={name} desc={readme} code={'```jsx\n' + raw.trim() + '\n````'} key={name}>
              <Comp />
          </Example>
        )
        <% }%>
        {{/if}}
        let DOC = () => <div>{children}</div>
        cb(null, DOC)
      }, '{{fullname}}')
    }
  },
  <% }%>
]
