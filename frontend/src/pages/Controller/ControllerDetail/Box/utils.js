function getReceiverValues(boxDetails) {
  const { firstName, lastName, phoneNumber, email, address } = boxDetails.parcel.receiver

  return {
    topValues: {
      firstName,
      lastName,
      phoneNumber,
      email
    },
    bottomValues: address
  }
}

function getInfoValues(boxDetails) {
  const {
    currentStatus,
    created,
    access: { consumerCollect, driverDeliver }
  } = boxDetails.parcel
  return {
    'Current status': currentStatus,
    Created: created,
    'Consumer Collected': consumerCollect ? 'Yes' : 'No',
    'Driver Delivered': driverDeliver ? 'Yes' : 'No'
  }
}

export { getReceiverValues, getInfoValues }
