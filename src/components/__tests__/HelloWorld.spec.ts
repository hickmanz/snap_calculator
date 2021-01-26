// src/components/__tests__/HelloWorld.spec.ts
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '../../store'
import SnapTypeCard from '../SnapTypeCard.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('SnapTypeCard.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SnapTypeCard, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})