const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        transaction_id: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        product_order_date: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        progress: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        order: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        row_num: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_url: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_count: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_color: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_delivery_method: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_jp_name: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_jp_address: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_en_name: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_postal_code: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_en_address: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_cell_phone_number: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        tracking_number: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_profit: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        shipping_total_cost: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_type_en: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_weight: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_price_en: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        confirmation_id: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_en_address_1: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_en_address_2: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_en_address_3: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_customer_en_address_4: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        product_title: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        naver_item_id: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        invoice_number: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        create_id: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        date_created: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        update_id: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        last_updated: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Order',
        tableName: 'order',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
};
