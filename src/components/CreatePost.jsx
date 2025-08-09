import React, { useCallback, useEffect, useState } from 'react'
import BlogEditor from '../miniComponents/BlogEditor'
import { useForm } from 'react-hook-form'
import Input from '../miniComponents/Input'
import Select from '../miniComponents/Select'
import databaseService from '../appwrite/database'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function CreatePost({ post }) {
  const userDataFromStore = useSelector((state) => state.authStore.userData)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { control, register, handleSubmit, watch, reset, setValue, getValues } = useForm({})


  // to set the data in form
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        status: post.status || 'active'
      })
    }
  }, [post, reset])

  console.log(post);



  //function to create post and edit post
  // async function createPost(data) {
  //   if (post) {
  //     const file = await databaseService.uploadFile(data.image[0])
  //     if (file) {
  //       await databaseService.deleteFile(post.featuredImage)
  //       data.featuredImage = file.$id;
  //     }

  //     data.userId = userDataFromStore.$id
  //     const db_post = await databaseService.updatePost(post.$id, data)
  //     if (db_post) {
  //       navigate(`/view-blog/${db_post.$id}`)
  //     }

  //   }else{
  //     const file = await databaseService.uploadFile(data.image[0])
  //     if (file) {
  //       data.featuredImage = file.$id;
  //     }

  //     // console.log(data);
  //     data.userId = userDataFromStore.$id
  //     const db_post = await databaseService.createPost(data)
  //     if (db_post) {
  //       navigate(`/view-blog/${db_post.$id}`)
  //     }
  //   }
  // }
  async function createPost(data) {
    setLoading(true);
    try {
      if (data.image && data.image.length > 0) {
        const file = await databaseService.uploadFile(data.image[0]);
        if (file) {
          if (post?.featuredImage) {
            await databaseService.deleteFile(post.featuredImage);
          }
          data.featuredImage = file.$id;
        }
      } else {
        if (post?.featuredImage) {
          data.featuredImage = post.featuredImage;
        } else {
          delete data.featuredImage;
        }
      }
      data.userId = userDataFromStore.$id;

      let db_post;
      if (post) {
        db_post = await databaseService.updatePost(post.$id, data);
        toast.success('Blog updated Successfully👍')
      } else {
        db_post = await databaseService.createPost(data);
        
      }

      if (db_post) {
        navigate(`/view-blog/${db_post.$id}`);
        toast.success('Blog created Successfully✨')
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setLoading(false);
    }
  }



  //transforming title to slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, "_")
    }
    return ""
  }, [])

  useEffect(() => {
    //value is state of form and name is fields of form
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title)
          , { shouldValidate: true });
      }
    });
    return () => subscribe.unsubscribe();
  }, [slugTransform, watch, setValue])




  return (
    <div className='p-5 md:px-20'>
      <form onSubmit={handleSubmit(createPost)}>

        <div className='md:flex gap-4'>
          <Input label={'Title'} placeholder='Title..' {...register('title', { required: true })} />
          <Input label={'Slug'} placeholder='Slug' {...register('slug', { required: true })}
            onInput={(e) => setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })} />
        </div>


        <div className='md:flex gap-10'>
          <BlogEditor label='Content' name='content' control={control} defaultValue={getValues('content')} />

          <div className='md:flex flex-col '>
            <Input label='Featured Image' type='file' accept='image/jpg, image/jpeg, image/png, image/gif' {...register('image')} />
            {post?.featuredImage ? (
              <div className="w-full flex justify-center mb-4">
                <img
                  src={post?.featuredImage ? databaseService.getFilePreview(post.featuredImage) : ''}
                  alt={post.title}
                  className="max-w-full h-80 object-contain mb-4"
                />
              </div>
            ) : null}
          </div>
        </div>


        <Select label='Status' options={['active', 'inactive']} {...register('status', { required: true })} />
        <button
          type='submit'
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${post ? 'bg-green-500' : 'bg-blue-500'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? (
            <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" ></path>
            </svg>
          ) : (
            post ? 'Update' : 'Submit'
          )}
        </button>
      </form>
    </div >
  )
}

export default CreatePost
