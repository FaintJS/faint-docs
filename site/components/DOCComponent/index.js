import React from 'react'
import Markdown from '../../components/Markdown'
import Example from '../../components/Example'

export default (props) => {
  let readme = props.readme ? <Markdown source={props.readme} /> : null
  let docs = null
  if (Array.isArray(props.docs)) {
    docs = props.docs.map((doc, index) => {
      let Comp = doc.component
      return (
        <Example title={doc.title} desc={doc.desc} code={'```jsx\n' + doc.raw.trim() + '\n````'} key={index}>
          <Comp />
        </Example>
      )
    })
  }
  return (
    <div>
      {readme}
      <hr style={{
        borderStyle: 'dashed',
        marginTop: '30px',
        borderWidth: '1px 0 0 0'
      }}/>
      {docs}
    </div>
  )
}
