import ProductList from './ProductList.mjs'

export default class CartModel extends ProductList {
  constructor(apiHandler, eventEmmiter) {
    super([])
    this.api = apiHandler
    this.eventEmmiter = eventEmmiter
  }

  fetch(onError) {
    this.api.getCart(
      (data) => { 
        this.list = JSON.parse(data)
        this.eventEmmiter.emit('cartFeched', this.list)
      },
      onError
    )
  }

  add(product, onError) {
    this.api.addToCart(
      () => {
        this.list.push(product)
      },
      onError,
      product
    )
  }

  remove(id, onError) {
    if(this.find(id)) {
      this.api.removeFromCart(
        () => {
          this.remove(id)
        },
        onError,
        this.list[index]
      )
    }
  }

}