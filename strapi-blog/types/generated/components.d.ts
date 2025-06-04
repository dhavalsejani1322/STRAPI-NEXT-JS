import type { Schema, Struct } from '@strapi/strapi';

export interface FaqQuestion extends Struct.ComponentSchema {
  collectionName: 'components_faq_questions';
  info: {
    displayName: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'faq.question': FaqQuestion;
    }
  }
}
