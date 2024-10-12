// ModalAdvisorAction.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AdvisorsContext } from '@/app/context'
import ModalAdvisorAction from '@/app/components/ModalAdvisorAction'

const mockUpdateAdvisor = jest.fn()

const mockContextValue = {
  isLoading: false,
  hasError: false,
  data: [],
  advisorById: {
    id: '8',
    name: 'Sarah Lee',
    income: 110000,
    email: 'sarah.lee@zoefin.com',
    phone: '"123-456-7897',
    address: '222 Cedar St, Los Angeles, CA 90001',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  searchAdvisor: jest.fn(),
  searchAdvisorById: jest.fn(),
  createNewAdvisor: jest.fn(),
  deleteAdvisor: jest.fn(),
  updateAdvisor: mockUpdateAdvisor,
}


describe('The advisor is going to be updated.', () => {
  beforeEach(() => {
    jest.clearAllMocks() 
  })

  test('should update advisor when the form is submitted with valid data', async () => {
    render(
      <AdvisorsContext.Provider value={mockContextValue}>
        <ModalAdvisorAction type={'updateUser'} isSetOpenModal={jest.fn()} />
      </AdvisorsContext.Provider>
    )

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sarah Lee Lee' } })
    fireEvent.change(screen.getByLabelText('ID Number'), { target: { value: '8' } })
    fireEvent.change(screen.getByLabelText('Income'), { target: { value: '120000' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0987654321' } })
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '456 Elm St' } })

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => expect(mockUpdateAdvisor).toHaveBeenCalledWith({
      id: '8',
      name: 'Sarah Lee',
      income: 110000,
      email: 'sarah.lee@zoefin.com',
      phone: '"123-456-7897',
      address: '222 Cedar St, Los Angeles, CA 90001',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    }))
  })
})
