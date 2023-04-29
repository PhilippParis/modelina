import { JavaRenderer } from '../JavaRenderer';
import {
  ConstrainedUnionModel
} from '../../../models';
import { JavaOptions } from '../JavaGenerator';
import { UnionPresetType } from '../JavaPreset';

/**
 * Renderer for Java's `class` type
 *
 * @extends JavaRenderer
 */
export class UnionRenderer extends JavaRenderer<ConstrainedUnionModel> {
  async defaultSelf(): Promise<string> {
    return `public interface ${this.model.name} {}`;
  }
}

export const JAVA_DEFAULT_UNION_PRESET: UnionPresetType<JavaOptions> = {
  self({ renderer }) {
    return renderer.defaultSelf();
  }
};