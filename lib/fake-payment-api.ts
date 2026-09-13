export async function fakePaymentVerify(
  authority: string
) {

  // شبیه‌سازی تاخیر درخواست به درگاه پرداخت
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  )


  // جواب فرضی درگاه
  return {
    success: true,
    authority,
  }

}