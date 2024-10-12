'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'
import Advisor from './components/Advisor'
import { AdvisorsContext } from '../context'

import AddAdvisors from './components/AddAdvisors'
import './list-advisors.css'
import useListAdvisors from '../hooks/useListAdvisors'
import usePagination from '../hooks/usePagination'
import Pagination from '../components/Pagination'
import { config } from '../config/config-app'
import LoadingSpinner from '../components/LoadingSpinner'

const ListAdvisors = () => {
	
  const SORT_OPTIONS = {
    ascending: 'ascending',
  }

  const SORT_ICONS = {
    upArrow: '↑',
    downArrow: '↓'
  }

  const { searchAdvisor, isLoading, hasError, data } = useContext(AdvisorsContext)
  const { currentPage, totalPages, handlePageChange } = usePagination({ 
    totalItems: data.length, 
    itemsPerPage: +config.paginationPerPage 
  })
  const { currentItems, sortConfig, requestSort } = useListAdvisors({ data, currentPage })

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

  if(isLoading) return <LoadingSpinner message='Searching for the best advisors for you...' />

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
						Advisor Name {sortConfig.key === 'name' && (sortConfig.direction === SORT_OPTIONS.ascending ? SORT_ICONS.upArrow : SORT_ICONS.downArrow)}
            </th>
            <th onClick={() => requestSort('income')} style={{ cursor: 'pointer' }}>
						Income {sortConfig.key === 'income' && (sortConfig.direction === SORT_OPTIONS.ascending ? SORT_ICONS.upArrow : SORT_ICONS.downArrow)}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>

  )
}

export default ListAdvisors
