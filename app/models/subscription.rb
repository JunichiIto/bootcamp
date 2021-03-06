# frozen_string_literal: true

module Subscription
  def self.create(customer_id, idempotency_key = SecureRandom.uuid)
    Stripe::Subscription.create({
      customer: customer_id,
      trial_end: 3.days.since.to_i,
      items: [{ plan: Plan.standard_plan.id }],
    }, {
      idempotency_key: idempotency_key
    })
  end

  def self.destroy(subscription_id)
    Stripe::Subscription.update(subscription_id, cancel_at_period_end: true)
  end
end
