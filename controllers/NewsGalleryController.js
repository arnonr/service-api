const { PrismaClient } = require("@prisma/client");
// select แบบพิเศษ
const prisma = new PrismaClient().$extends({
  result: {
    news_gallery: {
      news_gallery_file: {
        needs: { news_gallery_file: true },
        compute(news_gallery) {
          let news_gallery_file = null;
          if (news_gallery.news_gallery_file != null) {
            news_gallery_file =
              process.env.PATH_UPLOAD + news_gallery.news_gallery_file;
          }
          return news_gallery_file;
        },
      },
    },
  },
});

// ค้นหา
const filterData = (req) => {
  let $where = {
    deleted_at: null,
  };

  if (req.query.id) {
    $where["id"] = parseInt(req.query.id);
  }

  if (req.query.news_id) {
    $where["news_id"] = parseInt(req.query.news_id);
  }

  if (req.query.is_publish) {
    $where["is_publish"] = parseInt(req.query.is_publish);
  }

  return $where;
};

// หาจำนวนทั้งหมดและลำดับ
const countDataAndOrder = async (req, $where) => {
  //   Order
  let $orderBy = {};
  if (req.query.orderBy) {
    $orderBy[req.query.orderBy] = req.query.order;
  } else {
    $orderBy = { created_at: "desc" };
  }

  //Count
  let $count = await prisma.news_gallery.findMany({
    select: selectField,
    where: $where,
  });

  $count = $count.length;
  let $perPage = req.query.perPage ? Number(req.query.perPage) : 10;
  let $currentPage = req.query.currentPage ? Number(req.query.currentPage) : 1;
  let $totalPage =
    Math.ceil($count / $perPage) == 0 ? 1 : Math.ceil($count / $perPage);
  let $offset = $perPage * ($currentPage - 1);

  return {
    $orderBy: $orderBy,
    $offset: $offset,
    $perPage: $perPage,
    $count: $count,
    $totalPage: $totalPage,
    $currentPage: $currentPage,
  };
};

// ฟิลด์ที่ต้องการ Select รวมถึง join
const selectField = {
  id: true,
  news_id: true,
  news_gallery_file: true,
  is_publish: true,
};

const methods = {
  // ค้นหาทั้งหมด
  async onGetAll(req, res) {
    try {
      let $where = filterData(req);
      let other = await countDataAndOrder(req, $where);

      const item = await prisma.news_gallery.findMany({
        select: selectField,
        where: $where,
        orderBy: other.$orderBy,
        skip: other.$offset,
        take: other.$perPage,
      });

      res.status(200).json({
        data: item,
        totalData: other.$count,
        totalPage: other.$totalPage,
        currentPage: other.$currentPage,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  async onDelete(req, res) {
    try {
      const item = await prisma.news_gallery.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      res.status(200).json({ msg: "success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = { ...methods };
