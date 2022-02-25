// import Image from "next/image";
// import PersonificationIcon from "public/images/mailing-list-personification.png";
// import FileIcon from "public/images/file-icon.png";

const Toolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="" />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    {/* <button className="ql-blockquote" /> */}
    <select className="ql-align" defaultValue={""} onChange={e => e.persist()}>
      <option value="" />
      <option value="center" />
      <option value="right" />
    </select>
    <button className="ql-list" value="bullet" />
    <button className="ql-list" value="ordered" />
    <select className="ql-color" onChange={e => e.persist()} />
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-video" />
    {/* <button className="ql-file">
      <Image alt="icon" src={FileIcon} width={15} height={18.75} />
    </button>
    <button className="ql-personification">
      <Image alt="icon" src={PersonificationIcon} width={18} height={18} />
    </button> */}
  </div>
);

export default Toolbar;
