import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
  url: {
    type: String
  },
  size: {
    type: String
  },
  user: {
    type: String
  },
  width:{
    type:Number
  },
  height:{
    type:Number
  },
  uploadedAt: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

imageSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      url: this.url,
      width: this.width,
      height:this.height,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Image', imageSchema)

export const schema = model.schema
export default model
