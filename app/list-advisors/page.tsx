'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'
import Advisor from './components/Advisor'
import { AdvisorsContext } from '../context'

import AddAdvisors from './components/AddAdvisors'
import './list-advisors.css'
import useListAdvisors from '../hooks/useListAdvisors'

const ListAdvisors = () => {

  const { searchAdvisor, isLoading, hasError, data } = useContext(AdvisorsContext)
  const {
    currentItems,
    currentPage, 
    sortConfig, 
    totalPages,
    requestSort,
    handlePageChange 
  } = useListAdvisors({ data })

  const useNavigation = useRouter() 
  const searchParams = useSearchParams()
  const value = searchParams.get('query')

  useEffect(() => {
    if (!value) {
      useNavigation.push('/')
    }
    searchAdvisor(value!)
  }, [value, useNavigation])

  const handleBackNavigation = () =>  {
    useNavigation.push('/')
  }

  if(isLoading) return <p>Loading...</p>

  return (
    <main className="container_list_advisors">
      <section>
        <div className="box_header">
          <h1>Advisors</h1>
          <AddAdvisors />
        </div>
      </section>
      <table width="50%">
        <thead>
          <tr>
            <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
						Advisor Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th onClick={() => requestSort('income')} style={{ cursor: 'pointer' }}>
						Income {sortConfig.key === 'income' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        { 
          currentItems.length > 0
            ? currentItems.map(advisor => (
              <Advisor 
                key={advisor.id}
                advisors={advisor}
              />
            ))
            : <section className="null_incoming_list">
              <p>No available Advisors based on the provided income. Please try a different income value.</p>
              <button onClick={handleBackNavigation}>Try Again</button>
            </section>
        }
        <tfoot className="table-footer">
          <tr>
            <td colSpan={2}>
							Total Advisors: {data.length}
            </td>
          </tr>
        </tfoot>
      </table>
      {hasError && <p>{hasError}</p>}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            style={{ margin: '0 5px' }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </main>

  )
}

export default ListAdvisors
