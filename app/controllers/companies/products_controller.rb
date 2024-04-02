# frozen_string_literal: true

class Companies::ProductsController < ApplicationController
  def index
    @company = Company.find(params[:company_id])
    @products = []
    @company.users.each do |user|
      user.products.each do |product|
        @products << product
      end
    end
    @products = Kaminari.paginate_array(@products.sort.reverse).page(params[:page]).per(5)
    @weekdays = { 0 => '日', 1 => '月', 2 => '火', 3 => '水', 4 => '木', 5 => '金', 6 => '土' }
  end
end
