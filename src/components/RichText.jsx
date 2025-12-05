import React from 'react';

export default function RichText({ content }) {
   if (!content) return null;

   const renderText = (node) => {
      if (node.text === undefined) return null;

      let text = node.text;
      const format = node.format || 0;

      const isBold = (format & 1) !== 0;
      const isItalic = (format & 2) !== 0;
      const isStrikethrough = (format & 4) !== 0;
      const isUnderline = (format & 8) !== 0;
      const isCode = (format & 16) !== 0;
      const isSubscript = (format & 32) !== 0;
      const isSuperscript = (format & 64) !== 0;

      if (isCode) {
         text = <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{text}</code>;
      }
      if (isSubscript) {
         text = <sub className="text-xs">{text}</sub>;
      }
      if (isSuperscript) {
         text = <sup className="text-xs">{text}</sup>;
      }
      if (isStrikethrough) {
         text = <span className="line-through">{text}</span>;
      }
      if (isUnderline) {
         text = <span className="underline">{text}</span>;
      }
      if (isItalic) {
         text = <em className="italic">{text}</em>;
      }
      if (isBold) {
         text = <strong className="font-bold">{text}</strong>;
      }

      return text;
   };

   const getAlignmentClass = (format) => {
      if (!format) return '';

      switch (format) {
         case 'left':
            return 'text-left';
         case 'center':
            return 'text-center';
         case 'right':
            return 'text-right';
         case 'justify':
            return 'text-justify';
         default:
            return '';
      }
   };

   const renderNode = (node, index = 0) => {
      if (!node) return null;

      if (node.text !== undefined) {
         return <React.Fragment key={index}>{renderText(node)}</React.Fragment>;
      }

      const children = node.children?.map((child, i) => renderNode(child, i));
      const alignmentClass = getAlignmentClass(node.format);

      switch (node.type) {
         case 'paragraph':
            return <p key={index} className={`mb-4 last:mb-0 ${alignmentClass}`.trim()}>{children}</p>;

         case 'heading':
            const level = node.tag || 2;
            const headingClasses = {
               1: "text-4xl font-bold mb-6 mt-8",
               2: "text-3xl font-bold mb-5 mt-7",
               3: "text-2xl font-bold mb-4 mt-6",
               4: "text-xl font-bold mb-3 mt-5",
               5: "text-lg font-bold mb-2 mt-4",
               6: "text-base font-bold mb-2 mt-3",
            };
            const HeadingTag = `h${level}`;
            const headingClassName = `${headingClasses[level] || headingClasses[2]} ${alignmentClass}`.trim();
            return React.createElement(HeadingTag, {
               key: index,
               className: headingClassName
            }, children);

         case 'list':
            return node.listType === 'bullet' || node.tag === 'ul'
               ? <ul key={index} className={`list-disc list-inside ml-4 mb-4 space-y-2 ${alignmentClass}`.trim()}>{children}</ul>
               : <ol key={index} className={`list-decimal list-inside ml-4 mb-4 space-y-2 ${alignmentClass}`.trim()}>{children}</ol>;

         case 'listitem':
            return <li key={index} className="leading-relaxed">{children}</li>;

         case 'link':
            return (
               <a
                  key={index}
                  href={node.fields?.url || node.url}
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  target={node.fields?.newTab || node.newTab ? "_blank" : undefined}
                  rel={node.fields?.newTab || node.newTab ? "noopener noreferrer" : undefined}
               >
                  {children}
               </a>
            );

         case 'quote':
            return (
               <blockquote key={index} className={`border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700 dark:text-gray-300 ${alignmentClass}`.trim()}>
                  {children}
               </blockquote>
            );

         case 'block':
            return (
               <pre key={index} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4 overflow-x-auto">
                  <code className="text-sm font-mono">{children}</code>
               </pre>
            );

         case 'horizontalrule':
            return <hr key={index} className="my-8 border-t border-gray-300" />;

         case 'indent':
            return <div key={index} className="ml-8">{children}</div>;

         default:
            return <React.Fragment key={index}>{children}</React.Fragment>;
      }
   };

   return (
      <div className="rich-text leading-relaxed">
         {content.root?.children?.map((node, i) => renderNode(node, i))}
      </div>
   );
};