import { JavaGenerator, JAVA_JACKSON_PRESET } from '../../../../src/generators';

describe('JAVA_JACKSON_PRESET', () => {
  let generator: JavaGenerator;
  beforeEach(() => {
    generator = new JavaGenerator({ presets: [JAVA_JACKSON_PRESET] });
  });

  test('should render Jackson annotations for class', async () => {
    const doc = {
      $id: 'Clazz',
      type: 'object',
      properties: {
        min_number_prop: { type: 'number' },
        max_number_prop: { type: 'number' }
      }
    };
    const expectedDependencies = [
      'import java.util.Map;',
      'import com.fasterxml.jackson.annotation.*;'
    ];

    const models = await generator.generate(doc);
    expect(models).toHaveLength(1);
    expect(models[0].result).toMatchSnapshot();
    expect(models[0].dependencies).toEqual(expectedDependencies);
  });

  test('should render Jackson annotations for enum', async () => {
    const doc = {
      $id: 'Enum',
      type: 'string',
      description: 'Description for enum',
      examples: ['value'],
      enum: ['on', 'off']
    };

    const expectedDependencies = ['import com.fasterxml.jackson.annotation.*;'];

    const models = await generator.generate(doc);
    expect(models).toHaveLength(1);
    expect(models[0].result).toMatchSnapshot();
    expect(models[0].dependencies).toEqual(expectedDependencies);
  });

  
  test('should render Jackson annotations for union', async () => {
    const doc = {
      asyncapi: '2.6.0',
      info: {
        title: 'Pet',
        version: '1.0.0'
      },
      channels: {},
      components: {
        messages: {
          PetMessage: {
            payload: { $ref: '#/components/schemas/Pet' }
          }
        },
        schemas: {
          Pet: {
            discriminator: 'petType',
            oneOf: [
              { $ref: '#/components/schemas/Cat' },
              { $ref: '#/components/schemas/Dog' }
            ]
          },
          Cat: {
            type: 'object',
            additionalProperties: false,
            properties: {
              lives: {
                type: 'integer'
              }
            }
          },
          Dog: {
            type: 'object',
            additionalProperties: false,
            properties: {
              packSize: {
                type: 'integer'
              }
            }
          }
        }
      }
    };

    const expectedDependencies = ['import com.fasterxml.jackson.annotation.*;'];

    const models = await generator.generate(doc);
    expect(models).toHaveLength(3);
    expect(models[0].result).toMatchSnapshot();
    expect(models[0].dependencies).toEqual(expectedDependencies);
  });
});
