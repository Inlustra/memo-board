import { of, throwError } from 'rxjs'
import { delay } from 'rxjs/operators'

/**
 * Very Naive InMem service with a delay of 1000ms on all calls
 */
export class InMemMemoService {
  inMemStore = [
    {
      id: '5b4352213ba03ea63774c7e8',
      title: 'Amet adipisicing reprehenderit enim duis ut sunt velit',
      body:
        'Culpa consectetur duis amet duis. Voluptate mollit eiusmod id commodo minim. Esse dolor laborum do pariatur.',
      created_date: '2014-07-05T06:24:36 -02:00',
    },
    {
      id: '5b435221918caf939d1e0cae',
      title: 'Ea dolore fugiat veniam officia consequat',
      body:
        'Eu veniam tempor cupidatat nisi sunt aliquip ex reprehenderit aliqua officia reprehenderit eiusmod aliqua nulla. Eiusmod aliqua nulla.',
      created_date: '2014-01-10T04:24:58 -01:00',
    },
    {
      id: '5b435221156dee504c075007',
      title: 'Ea veniam ea consequat non ipsum tempor',
      body:
        'Ut minim fugiat exercitation pariatur labore sint esse. Exercitation culpa qui mollit exercitation dolor sit qui dolore proident qui.',
      created_date: '2016-06-06T09:45:24 -02:00',
    },
    {
      id: '5b43522120f941165500bc3e',
      title: 'In ea elit eu tempor adipisicing commodo',
      body:
        'Minim do enim incididunt amet sit sint. Adipisicing consequat consectetur aliqua proident culpa incididunt ad amet Lorem ex et.',
      created_date: '2016-03-15T09:06:37 -01:00',
    },
    {
      id: '5b4352217dc911d6fd00a442',
      title: 'Consectetur minim occaecat velit cupidatat',
      body:
        'Esse do id id et pariatur eu excepteur aute irure ut enim culpa velit nulla. incididunt mollit consectetur ad eu qui nostrud',
      created_date: '2015-06-23T11:38:22 -02:00',
    },
    {
      id: '5b435221255172a722097b31',
      title: 'Mollit mollit sunt do officia deserunt duis et excepteur',
      body:
        'Cillum cupidatat excepteur duis ad ex duis excepteur pariatur commodo irure qui dolor labore esse. dolor officia laborum minim ad.',
      created_date: '2016-09-25T03:30:57 -02:00',
    },
    {
      id: '5b435225517242a722097b34',
      title: 'excepteur pariatur commodo irure',
      body:
        'Cillum cupidatat excepteur duis ad  excepteur pariatur commodo irure qui dolor labore esse. Non mollit dolor officia laborum minim ad.',
      created_date: '2016-09-25T03:30:57 -02:00',
    },
    {
      id: '5b435221255172a76dg220921',
      title: 'Mollit mollit sunt do officia deserunt duis et excepteur',
      body:
        'Cillum cupidatat excepteur duis ad ex duis  commodo irure qui dolor labore esse. Non mollit dolor officia laborum minim ad.',
      created_date: '2016-09-25T03:30:57 -02:00',
    },
    {
      id: '5b435221255172a722097b01',
      title: 'Non mollit dolor officia',
      body:
        'Cillum cupidatat excepteur duis ad ex duis excepteur pariatur commodo . Non mollit dolor officia laborum minim ad.',
      created_date: '2016-09-25T03:30:57 -02:00',
    },
    {
      id: '5b435221255172a722097b94',
      title: 'Mollit mollit sunt do officia deserunt duis et excepteur',
      body:
        'Cillum cupidatat excepteur duis ad ex duis excepteur pariatur commodo irure qui dolor labore esse. Non mollit dolor',
      created_date: '2016-09-25T03:30:57 -02:00',
    },
  ]

  // GET /ideas/
  getMemos() {
    return of(this.inMemStore.slice()).pipe(delay(1000))
  }

  // GET /ideas/new/
  createMemo() {
    const newMemo = { id: guid(), created_date: new Date().toISOString() }
    this.inMemStore = [...this.inMemStore, newMemo]
    return of({ ...newMemo }).pipe(delay(1000))
  }

  // POST idea/update
  updateMemo(memo) {
    const oldMemoIndex = this.inMemStore.findIndex(
      storeMemo => storeMemo.id === memo.id,
    )
    if (oldMemoIndex === undefined || oldMemoIndex === null) {
      return throwError({ message: 'Invalid id' })
    }
    this.inMemStore = Object.assign([], this.inMemStore, { oldMemoIndex: memo })
    return of({ ...memo }).pipe(delay(1000))
  }

  // POST idea/delete
  deleteMemo(id) {
    const oldMemoIndex = this.inMemStore.findIndex(
      storeMemo => storeMemo.id === id,
    )
    if (oldMemoIndex === undefined || oldMemoIndex === null) {
      return throwError({ message: 'Invalid id' })
    }
    this.inMemStore = this.inMemStore.slice().splice(oldMemoIndex, 1)
    return of(null).pipe(delay(1000))
  }
}

// Prettier doesn't like this function...
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}
