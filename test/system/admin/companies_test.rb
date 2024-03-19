# frozen_string_literal: true

require 'application_system_test_case'

class Admin::CompaniesTest < ApplicationSystemTestCase
  test 'show listing companies' do
    visit_with_auth '/admin/companies', 'komagata'
    assert_equal '管理ページ | FBC', title
    assert has_link?(companies(:newest_company).name, href: company_path(companies(:newest_company)))
  end

  test 'create company' do
    visit_with_auth '/admin/companies/new', 'komagata'
    within 'form[name=company]' do
      fill_in 'company[name]', with: 'テスト企業'
      fill_in 'company[description]', with: 'テストの企業です。'
      fill_in 'company[website]', with: 'https://example.com'
      fill_in 'company[blog_url]', with: 'https://example.com'
      click_button '登録する'
    end
    assert_text '企業を作成しました。'
  end

  test 'update company' do
    visit_with_auth "/admin/companies/#{companies(:company1).id}/edit", 'komagata'
    within 'form[name=company]' do
      fill_in 'company[name]', with: 'テスト企業'
      fill_in 'company[description]', with: 'テストの企業です。'
      fill_in 'company[website]', with: 'https://example.com'
      fill_in 'company[blog_url]', with: 'https://example.com'
      click_button '更新する'
    end
    assert_text '企業を更新しました。'
  end

  test 'delete company' do
    visit_with_auth "/admin/companies/#{companies(:company1).id}/edit", 'komagata'
    click_on '削除'
    page.driver.browser.switch_to.alert.accept
    assert_text '企業を削除しました。'
  end

  test 'show pagination' do
    visit_with_auth '/admin/companies', 'komagata'
    # ページ遷移直後なのでreactコンポーネントが表示されるまで待つ
    within "[data-testid='admin-companies']" do
      assert_selector 'nav.pagination', count: 2
    end

    first('.pagination__item-link', text: '2').click
    assert_equal 2, page.all('.pagination__item-link.is-active', text: '2').count
    first('.pagination__item-link', text: '1').click
    assert_equal 2, page.all('.pagination__item-link.is-active', text: '1').count
  end

  test 'no pagination when 20 companies or less exist' do
    Company.where.not(description: 'このデータはページャーの確認用').destroy_all
    visit_with_auth '/admin/companies', 'komagata'
    # ページ遷移直後なのでreactコンポーネントが表示されるまで待つ
    within "[data-testid='admin-companies']" do
      assert_no_selector 'nav.pagination'
    end
  end

  test 'companies are ordered by created_at desc' do
    visit_with_auth '/admin/companies', 'komagata'
    # ページ遷移直後なのでreactコンポーネントが表示されるまで待つ
    assert_selector "[data-testid='admin-companies']"
    within all('.admin-table__item')[0] do
      assert_selector 'td.company-name', text: '【created_at降順確認】一番新しい株式会社'
    end

    within all('.admin-table__item')[1] do
      assert_selector 'td.company-name', text: '【created_at降順確認】二番目に新しい株式会社'
    end

    find('.pagination__item.is-next button.pagination__item-link', match: :first).click

    within all('.admin-table__item').last do
      assert_selector 'td.company-name', text: '【created_at降順確認】最古株式会社'
    end
  end
end
