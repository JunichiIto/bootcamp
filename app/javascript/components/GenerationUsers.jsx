import React, { useState, useEffect } from 'react'
import User from './User.jsx'
import Pager from './Pager.jsx'
import CSRF from 'csrf'

const getParams = () => {
  const params = new URLSearchParams(location.search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  if (location.pathname.match(/tags/)) {
    const tag = location.pathname.split('/').pop()
    result.tag = tag
  }
  return result
}

export default function GenerationUsers({ generationID }) {
  const [users, setUsers] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(Number(getParams().page) || 1)
  const [totalPages, setTotalPages] = useState(0)
  const [params] = useState(getParams())

  useEffect(() => {
    window.onpopstate = () => {
      location.replace(location.href)
    }
    getUsers()
    getCurrentUser()
  }, [])

  useEffect(() => {
    getUsers()
  }, [currentPage, params])

  const getUsers = () => {
    const url =
      `/api/generations/${generationID}.json` +
      (params.tag ? `tags/${params.tag}` : '') +
      `?page=${currentPage}` +
      (params.target ? `&target=${params.target}` : '') +
      (params.watch ? `&watch=${params.watch}` : '')
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': CSRF.getToken()
      },
      credentials: 'same-origin',
      redirect: 'manual'
    })
      .then((response) => response.json())
      .then((json) => {
        setUsers(json.users)
        setCurrentUser(json.currentUser)
        setTotalPages(json.totalPages)
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  const getCurrentUser = () => {
    fetch('/api/generations/&{generationID}', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': CSRF.getToken()
      },
      credentials: 'same-origin',
      redirect: 'manual'
    })
      .then((response) => response.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error('Error fetching current user:', error))
  }

  const paginateClickCallback = (pageNumber) => {
    setCurrentPage(pageNumber)
    history.pushState(null, null, newUrl(pageNumber))
    window.scrollTo(0, 0)
  }

  const newUrl = (pageNumber) => {
    const url = new URL(location)
    url.searchParams.set('page', pageNumber)
    return url.toString()
  }

  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page')
    if (page) setCurrentPage(Number(page))
  }, [])

  const pagerProps = {
    initialPageNumber: currentPage,
    pageCount: totalPages,
    pageRange: 5,
    clickHandle: paginateClickCallback
  }

  return (
    <div className="page-body">
      {totalPages > 1 && (
        <nav className="pagination">
          <div className="container">
            <Pager {...pagerProps} />
          </div>
        </nav>
      )}
      <div className="container">
        <div className="users row">
          {users === null ? (
            <div className="empty">
              <i className="fa-solid fa-spinner fa-pulse" />
              ロード中
            </div>
          ) : users.length !== 0 ? (
            users.map((user) => (
              <User key={user.id} user={user} currentUser={currentUser} />
            ))
          ) : (
            <div className="row">
              <div className="o-empty-message">
                <div className="o-empty-message__icon">
                  <i className="fa-regular fa-smile"></i>
                </div>
                <p className="o-empty-message_text">
                  {generationID}期のユーザー一覧はありません
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <nav className="pagination">
          <div className="container">
            <Pager {...pagerProps} />
          </div>
        </nav>
      )}
    </div>
  )
}
