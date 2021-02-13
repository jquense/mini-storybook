import React from 'react'

export default {
  title: 'My example Story',
}

export const BasicExample = () => <strong>Hi there</strong>

export const ComplexExample = () => <strong>I'm a bit fancier</strong>

ComplexExample.storyName = 'With properties'
