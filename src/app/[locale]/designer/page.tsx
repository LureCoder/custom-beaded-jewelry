// page.tsx: Designer 页面 — 3D 念珠定制设计器
import { Metadata } from 'next';
import { getMaterials } from '@/lib/get-materials';
import { getAccessories } from '@/lib/get-accessories';
import { DesignerViewer } from '@/components/designer/designer-viewer';

export const metadata: Metadata = {
  title: 'Designer - Kongxing Mala',
  description: 'Design your custom mala beads in 3D',
};

export default async function DesignerPage() {
  const [materials, accessories] = await Promise.all([
    getMaterials(),
    getAccessories(),
  ]);
  return <DesignerViewer materials={materials} accessories={accessories} />;
}
