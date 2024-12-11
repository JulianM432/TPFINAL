export default function HeadTable({ header }) {
  return (
    <thead>
      <tr>{header && header.map((head,indx) => <th key={indx}>{head}</th>)}</tr>
    </thead>
  );
}
