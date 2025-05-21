import { createContext, useContext } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogContext = createContext()
const queryClient = new QueryClient()

const useBlogs = (user, notify) => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    enabled: !!user, // Only fetch if user is logged in
    onError: () => {
      notify('Failed to fetch blogs', 'error')
    },
  })
}

const useCreateBlog = (notify) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(['blogs'])
      notify(`Blog "${newBlog.title}" by ${newBlog.author} added!`)
    },
    onError: () => {
      notify('Failed to create blog', 'error')
    },
  })
}

const useUpdateBlog = (notify) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (updatedBlog) =>
      blogService.update(updatedBlog.id, updatedBlog),
    onSuccess: (updated) => {
      queryClient.invalidateQueries(['blogs'])
      notify(`Liked: ${updated.title} by ${updated.author}`)
    },
    onError: () => {
      notify('Error updating blog likes', 'error')
    },
  })
}

const useDeleteBlog = (notify) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, title, author }) => blogService.remove(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(['blogs'])
      notify(`Deleted blog "${variables.title}" by ${variables.author}`)
    },
    onError: () => {
      notify('Error deleting blog', 'error')
    },
  })
}

export const BlogContextProvider = ({ children, user, notify }) => {
  const blogsQuery = useBlogs(user, notify)

  return (
    <BlogContext.Provider value={blogsQuery}>{children}</BlogContext.Provider>
  )
}

export const useBlogValue = () => useContext(BlogContext)

export {
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
  queryClient,
  QueryClientProvider,
}
