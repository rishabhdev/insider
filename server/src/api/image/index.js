import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Image, { schema } from './model'

const router = new Router()
const { url, size, user, uploadedAt,width,height } = schema.tree

/**
 * @api {post} /images Create image
 * @apiName CreateImage
 * @apiGroup Image
 * @apiParam url Image's url.
 * @apiParam size Image's size.
 * @apiParam user Image's user.
 * @apiParam uploadedAt Image's uploadedAt.
 * @apiSuccess {Object} image Image's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Image not found.
 */
router.post('/',
  body({ url, size, user, uploadedAt,width,height,'image':'','name':''}),
  create)

/**
 * @api {get} /images Retrieve images
 * @apiName RetrieveImages
 * @apiGroup Image
 * @apiUse listParams
 * @apiSuccess {Object[]} images List of images.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /images/:id Retrieve image
 * @apiName RetrieveImage
 * @apiGroup Image
 * @apiSuccess {Object} image Image's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Image not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /images/:id Update image
 * @apiName UpdateImage
 * @apiGroup Image
 * @apiParam url Image's url.
 * @apiParam size Image's size.
 * @apiParam user Image's user.
 * @apiParam uploadedAt Image's uploadedAt.
 * @apiSuccess {Object} image Image's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Image not found.
 */
router.put('/:id',
  body({ url, size, user, uploadedAt }),
  update)

/**
 * @api {delete} /images/:id Delete image
 * @apiName DeleteImage
 * @apiGroup Image
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Image not found.
 */
router.delete('/:id',
  destroy)

export default router
