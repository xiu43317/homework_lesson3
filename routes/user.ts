import express from 'express'
import Post from '../models/posts'
import handleSuccess from '../eventHandler/handleSuccess'
import handleError from '../eventHandler/handleError'

const router = express.Router()

router.get('/posts',async(req, res)=>{
    const post = await Post.find()
    handleSuccess(res,post)
})

router.post('/posts',async(req,res)=>{
    try {
      const data = req.body
        if (data.content !== undefined) {
          const newPost = await Post.create({
            name: data.name,
            content: data.content,
          });
          handleSuccess(res,newPost)
        } else {
          handleError(res,null)
        }
      } catch (error) {
        handleError(res,error)
      }
})

router.delete('/posts/:id',async(req,res)=>{
    const id:string = req.params.id
    try{
        await Post.findByIdAndDelete(id);
        const message =
          {
            delete: "yes"
          }
          handleSuccess(res,message)
    }catch(error){
    handleError(res,error)
    }
})

router.delete('/posts',async(req,res)=>{
    await Post.deleteMany({})
    const message =
    {
      delete: "yes"
    }
    handleSuccess(res,message)  
})

router.patch('/posts/:id',async(req,res)=>{
    const id:string = req.params.id
    try{
        await Post.findByIdAndDelete(id);
        const message =
          {
            delete: "yes"
          }
          handleSuccess(res,message)
      }catch(error){
        handleError(res,error)
      }
})
export default router