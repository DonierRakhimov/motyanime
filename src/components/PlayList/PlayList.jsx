import React from 'react';
import s from './playlist.module.css';
import AnimeResult from '../AnimeResult/AnimeResult';
import isEmpty from 'lodash.isempty';
import { ReactComponent as SadIcon } from '../../assets/images/sad.svg';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';

const itemsPerPage = 6;

export default function PlayList({ savedList = [], plannedList = [] }) {
  const [currentList, setCurrentList] = React.useState(savedList);
  const [currentItems, setCurrentItems] = React.useState(() =>
    savedList.slice(0, itemsPerPage)
  );

  const handlePageChange = (event) => {
    const startOffset = event.selected * itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    setCurrentItems(currentList.slice(startOffset, endOffset));
  };

  React.useEffect(() => {
    if (!isEmpty(savedList)) {
      setCurrentList(savedList);
    }
  }, [savedList]);

  React.useEffect(() => {
    if (!isEmpty(currentList)) {
      setCurrentItems(currentList.slice(0, itemsPerPage));
    }
  }, [currentList]);

  return (
    <div className={s.root}>
      <h2 className={s.playListTitle}>Плейлист</h2>
      <div className={s.playListContainer}>
        <div className={s.playListHeader}>
          <div className={s.btnContainer}>
            <button
              className={classNames(
                s.switchBtn,
                currentList === savedList ? s.active : ''
              )}
              onClick={() => setCurrentList(savedList)}
            >
              Сохранённое
            </button>
            <button
              className={classNames(
                s.switchBtn,
                currentList === plannedList ? s.active : ''
              )}
              onClick={() => setCurrentList(plannedList)}
            >
              Запланированное
            </button>
          </div>
        </div>
        <div className={s.playList}>
          {isEmpty(currentList) ? (
            <div className={s.messageContainer}>
              <SadIcon className={s.sadIcon}></SadIcon>
              <p className={s.emptyMessage}>Тут пусто...</p>
            </div>
          ) : (
            <ul className={s.list}>
              {currentItems.map((savedTitle, index) => (
                <li className={s.listItem} key={index}>
                  <AnimeResult
                    animeResult={savedTitle}
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  ></AnimeResult>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={s.paginateWrapper}>
          <ReactPaginate
            onPageChange={handlePageChange}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(currentList.length / itemsPerPage)}
            pageClassName={s.page}
            pageLinkClassName={s.pageItem}
            previousLabel='<'
            previousClassName={s.page}
            previousLinkClassName={s.pageItem}
            nextLabel='>'
            nextClassName={s.page}
            nextLinkClassName={s.pageItem}
            breakLabel='...'
            breakClassName={s.page}
            breakLinkClassName={s.pageItem}
            containerClassName={s.paginationContainer}
            activeLinkClassName={s.activeItem}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}
