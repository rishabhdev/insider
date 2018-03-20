import { Image } from '.'

let image

beforeEach(async () => {
  image = await Image.create({ url: 'test', size: 'test', user: 'test', uploadedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = image.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(image.id)
    expect(view.url).toBe(image.url)
    expect(view.size).toBe(image.size)
    expect(view.user).toBe(image.user)
    expect(view.uploadedAt).toBe(image.uploadedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = image.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(image.id)
    expect(view.url).toBe(image.url)
    expect(view.size).toBe(image.size)
    expect(view.user).toBe(image.user)
    expect(view.uploadedAt).toBe(image.uploadedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
