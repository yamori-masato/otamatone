// @ts-nocheck
// TODO: 型チェックを有効にする

export default function pushPopDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value
  descriptor.value = function (...args: any[]) {
    this.p.push()
    original.apply(this, args)
    this.p.pop()
  }
}
