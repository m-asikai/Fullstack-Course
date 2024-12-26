import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('Hidden details', () => {
    const blog = {
        id: 1,
        title: 'Test title',
        author: 'Test author',
        url: 'https://test.test',
        likes: 1,
        user: {
            id: 'MongoDbId',
            username: 'Username',
            name: 'Name'
        }
    }

    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blog')
    expect(div).toHaveStyle('display: none');

})

test('Click', async () => {
    const blog = {
        id: 1,
        title: 'Test title',
        author: 'Test author',
        url: 'https://test.test',
        likes: 1,
        user: {
            id: 'MongoDbId',
            username: 'Username',
            name: 'Name'
        }
    }
    const mock = vi.fn()
    const user = userEvent.setup()
    render(<Blog blog={blog} click={mock}/>)
    const button = screen.getByText('View')
    await user.click(button)
})

test('Click twice', async () => {
    const blog = {
        id: 1,
        title: 'Test title',
        author: 'Test author',
        url: 'https://test.test',
        likes: 1,
        user: {
            id: 'MongoDbId',
            username: 'Username',
            name: 'Name'
        }
    }
    const u = {
        id: 'MongoDbId',
        username: 'Username',
        name: 'Name'
    }
    const mock = vi.fn()
    const user = userEvent.setup()
    render(<Blog blog={blog} click={mock} user={u}/>)
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(mock.mock.calls).toHaveLength(2)
})

test('Form', async () => {
    const mock = vi.fn()
    const user = userEvent.setup()
    render(<BlogForm addBlog={mock}/>)
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'Title')
    await user.type(inputs[1], 'Author')
    await user.type(inputs[2], 'url.com')
    await user.type(inputs[3], '3')

    expect(addBlog.mock.calls[0][0].content).toBe('Title')
    expect(addBlog.mock.calls[0][1].content).toBe('Author')
    expect(addBlog.mock.calls[0][2].content).toBe('url.com')
    expect(addBlog.mock.calls[0][3].content).toBe('3')
})