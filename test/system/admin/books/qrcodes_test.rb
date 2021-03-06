# frozen_string_literal: true

require "application_system_test_case"

class Admin::Books::QrcodesTest < ApplicationSystemTestCase
  setup { login_user "komagata", "testtest" }

  test "show qrcodes" do
    book = books(:book_1)
    visit "/admin/books/qrcodes"
    assert_text "#{book.id}"
  end

  test "show qrcode" do
    book = books(:book_1)
    visit "/admin/books/qrcodes/#{book.id}"
    assert_text "#{book.id}"
  end
end
