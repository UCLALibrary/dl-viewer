import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
// @ts-expect-error: ignore missing declaration for .vue module
import App from '../App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('You did it!')
  })
})
