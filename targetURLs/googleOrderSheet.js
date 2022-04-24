const { GoogleSpreadsheet } = require('google-spreadsheet');
const Order = require('../models/order');
const dayjs = require('dayjs');

async function googleOrderSheet() {
  // 시트 url중 값
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_ID || googleSpreadId);

  // GOOGLE_API_KEY로 구글API다루는 방법. 읽는것만 가능.
  // doc.useApiKey(process.env.GOOGLE_API_KEY);

  // GOOGLE_SERVICE로 구글API다루는 방법. 편집 가능.
  // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || googleServiceAccountEmail,
    private_key: process.env.GOOGLE_PRIVATE_KEY || googlePrivateKey,
  });

  // loads document properties and worksheets
  await doc.loadInfo();

  // the buymaList 시트ID로 시트취득
  const sheet = doc.sheetsById[process.env.GOOGLE_ORDER_SHEET_ID || googleOrderSheetId];

  // rows 취득
  const rows = await sheet.getRows();

  // 오늘날짜 취득
  let today = dayjs().format('YYYY/MM/DD');

  //비지니스 로직
  for (i = 1; i < rows.length; i++) {
    // transactionID가 없으면 스킵
    if (!rows[i].transactionID) continue;

    if (rows[i].progress == 'FALSE' || rows[i].order == 'FALSE') {
      // 進捗와注文가 'FALSE'인 경우에만 취득
      let transactionIDResult;
      try {
        transactionIDResult = await Order.findOne({
          where: { transaction_id: rows[i].transactionID },
        });
      } catch (e) {
        console.log('findOne error', e);
      }

      if (transactionIDResult) {
        //transactionID가 db에 있는경우,갱신
        try {
          await Order.update(
            {
              product_order_date: rows[i].productOrderDate,
              progress: rows[i].progress,
              order: rows[i].order,
              row_num: rows[i].rowNum,
              product_url: rows[i].productURL,
              product_count: rows[i].productCount,
              product_color: rows[i].productColor,
              product_delivery_method: rows[i].productDeliveryMethod,
              product_customer_jp_name: rows[i].productCustomerJPName,
              product_customer_jp_address: rows[i].productCustomerJPAddress,
              product_customer_en_name: rows[i].productCustomerENName,
              product_customer_postal_code: rows[i].productCustomerPostalCode,
              product_customer_en_address: rows[i].productCustomerENAddress,
              product_customer_cell_phone_number: rows[i].productCustomerCellPhoneNumber,
              tracking_number: rows[i].trackingNumber,
              product_profit: rows[i].productProfit,
              shipping_total_cost: rows[i].shippingTotalCost,
              product_type_en: rows[i].productTypeEN,
              product_weight: rows[i].productWeight,
              product_price_en: rows[i].productPriceEN,
              confirmation_id: rows[i].confirmationID,
              product_customer_en_address_1: rows[i].productCustomerENAddress1,
              product_customer_en_address_2: rows[i].productCustomerENAddress2,
              product_customer_en_address_3: rows[i].productCustomerENAddress3,
              product_customer_en_address_4: rows[i].productCustomerENAddress4,
              comment: rows[i].comment,
              product_title: rows[i].productTitle,
              naver_item_id: rows[i].naverItemID,
              invoice_number: rows[i].invoiceNumber,
              update_id: 'crawling',
              last_updated: today,
            },
            {
              where: { transaction_id: rows[i].transactionID },
            },
          );
        } catch (e) {
          console.log('update error', e);
        }
      } else {
        //transactionID가 db에 없는경우,추가
        try {
          await Order.create({
            user_id: 'all',
            transaction_id: rows[i].transactionID,
            product_order_date: rows[i].productOrderDate,
            progress: rows[i].progress,
            order: rows[i].order,
            row_num: rows[i].rowNum,
            product_url: rows[i].productURL,
            product_count: rows[i].productCount,
            product_color: rows[i].productColor,
            product_delivery_method: rows[i].productDeliveryMethod,
            product_customer_jp_name: rows[i].productCustomerJPName,
            product_customer_jp_address: rows[i].productCustomerJPAddress,
            product_customer_en_name: rows[i].productCustomerENName,
            product_customer_postal_code: rows[i].productCustomerPostalCode,
            product_customer_en_address: rows[i].productCustomerENAddress,
            product_customer_cell_phone_number: rows[i].productCustomerCellPhoneNumber,
            tracking_number: rows[i].trackingNumber,
            product_profit: rows[i].productProfit,
            shipping_total_cost: rows[i].shippingTotalCost,
            product_type_en: rows[i].productTypeEN,
            product_weight: rows[i].productWeight,
            product_price_en: rows[i].productPriceEN,
            confirmation_id: rows[i].confirmationID,
            product_customer_en_address_1: rows[i].productCustomerENAddress1,
            product_customer_en_address_2: rows[i].productCustomerENAddress2,
            product_customer_en_address_3: rows[i].productCustomerENAddress3,
            product_customer_en_address_4: rows[i].productCustomerENAddress4,
            comment: rows[i].comment,
            product_title: rows[i].productTitle,
            naver_item_id: rows[i].naverItemID,
            invoice_number: rows[i].invoiceNumber,
            create_id: 'crawling',
            date_created: today,
            update_id: 'crawling',
            last_updated: today,
          });
        } catch (e) {
          console.log('insert error', e);
        }
      }
    }
  }
}

module.exports.googleOrderSheet = googleOrderSheet;
