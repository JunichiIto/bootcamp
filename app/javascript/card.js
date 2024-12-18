document.addEventListener('DOMContentLoaded', () => {
  if (
    !document.querySelector(
      'body.is-users-new,body.is-users-create,body.is-card-new,body.is-card-edit'
    )
  ) {
    return null
  }

  const selectableCreditCardCheckBox = document.querySelector(
    '.selectable-credit-card-box'
  )

  const checkedCreditCardCheckBox = document.querySelector(
    '.checked-credit-card-box'
  )

  const userRole = document.querySelector('.user-role')

  // Create a Stripe client.
  const stripe = window.Stripe(window.stripePublicKey)

  // Create an instance of Elements.
  const elements = stripe.elements()

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  const style = {
    base: {
      color: '#32325d',
      lineHeight: '18px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }

  // Create an instance of the card Element.
  const card = elements.create('card', { style: style, hidePostalCode: true })

  if (!userRole || checkedCreditCardCheckBox) {
    card.mount('#card-element')
  }

  selectableCreditCardCheckBox?.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      // Add an instance of the card Element into the `card-element` <div>.
      card.mount('#card-element')
    }
  })

  const submitButton = document.getElementById('user_submit')

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', (event) => {
    const displayError = document.getElementById('card-errors')
    submitButton.disabled = false
    if (event.error) {
      displayError.textContent = event.error.message
    } else {
      displayError.textContent = ''
    }
  })

  // Handle form submission.
  const form = document.getElementById('payment-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const selectableCreditCardCheckBox = document.querySelector(
      '.selectable-credit-card-box'
    )

    const checkedCreditCardCheckBox = document.querySelector(
      '.checked-credit-card-box'
    )

    if (
      selectableCreditCardCheckBox?.checked ||
      checkedCreditCardCheckBox ||
      !userRole
    ) {
      stripe.createToken(card).then((result) => {
        if (result.error) {
          // Inform the user if there was an error.
          const errorElement = document.getElementById('card-errors')
          errorElement.textContent = result.error.message
        } else {
          // Send the token to your server.
          stripeTokenHandler(result.token)
        }
      })
    } else {
      form.submit()
    }
  })

  // Submit the form with the token ID.
  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    const form = document.getElementById('payment-form')
    const hiddenInput = document.createElement('input')
    hiddenInput.setAttribute('type', 'hidden')
    hiddenInput.setAttribute('name', 'stripeToken')
    hiddenInput.setAttribute('value', token.id)
    form.appendChild(hiddenInput)

    // Submit the form
    form.submit()
  }
})
