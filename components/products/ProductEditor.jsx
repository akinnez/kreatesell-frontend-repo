import dynamic from 'next/dynamic';
import { Button } from 'antd';
import 'react-quill/dist/quill.snow.css'
import { Toolbar } from './ProductToolbar';
import styles from './ProductEditor.module.scss';
import { useEffect, useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function ProductEditor({ content, setContent }) {
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    const loadQuillModules = async () => {
      if (typeof window !== 'undefined') {
        const ImageResize = await import('quill-image-resize-module-react');
        const Quill = require('react-quill');

        Quill.Quill.register('modules/imageResize', ImageResize.default);

        setQuill(Quill.Quill.import('parchment'));
      }
    };

    loadQuillModules();
  }, []);

  if (!quill) {
    return null;
  }


  return (
    <div className={styles.quillEditor} style={{ minHeight: '250px'}}>
      <div className="">
        <ReactQuill
          placeholder="Text here"
          value={content}
          onChange={setContent}
          modules={{
            ...Toolbar.modules,
            imageResize: {
              parchment: quill,
              modules: ['Resize', 'DisplaySize', 'Toolbar'],
            }
          }}
		  theme='snow'
          formats={Toolbar.formats}
        />
      </div>
      <div className="absolute hidden">
        <Button>Text</Button>
        <Button>Html</Button>
      </div>
    </div>
  );
}
