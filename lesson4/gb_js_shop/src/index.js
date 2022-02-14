import ApiHandler from './ApiHandler.js';
import CartModel from './CartModel.mjs';
import ShowcaseModel from './ShowcaseModel.js';
import EventEmitter from './EventEmitter.mjs';

import './assets/scss/main.scss'

const API_URL = '/api/v1'

const api = new ApiHandler(API_URL)
const eventEmmiter = new EventEmitter()

const cart = new CartModel(api, eventEmmiter)
const showcase = new ShowcaseModel(api, eventEmmiter, cart)

eventEmmiter.subscribe('showcaseFeched', (data) => {
  console.log(data)
})

eventEmmiter.subscribe('cartFeched', (data) => {
  console.log(data)
})

showcase.fetch()
cart.fetch()


