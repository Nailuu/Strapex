import type { Struct, Schema } from '@strapi/strapi';

export interface IdkParagraph extends Struct.ComponentSchema {
  collectionName: 'components_idk_paragraphs';
  info: {
    displayName: 'Paragraph';
    icon: 'italic';
  };
  attributes: {
    Text: Schema.Attribute.Text;
  };
}

export interface IdkImageDescription extends Struct.ComponentSchema {
  collectionName: 'components_idk_image_descriptions';
  info: {
    displayName: 'Image + Description';
    icon: 'picture';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Description: Schema.Attribute.Text;
  };
}

export interface IdkHeaderParagraph extends Struct.ComponentSchema {
  collectionName: 'components_idk_header_paragraphs';
  info: {
    displayName: 'Header + Paragraph';
  };
  attributes: {
    Title: Schema.Attribute.String;
    Text: Schema.Attribute.Text;
  };
}

export interface IdkCarousel extends Struct.ComponentSchema {
  collectionName: 'components_idk_carousels';
  info: {
    displayName: 'Carousel';
    icon: 'grid';
  };
  attributes: {
    Images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'idk.paragraph': IdkParagraph;
      'idk.image-description': IdkImageDescription;
      'idk.header-paragraph': IdkHeaderParagraph;
      'idk.carousel': IdkCarousel;
    }
  }
}
